// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EventTicketNFT is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Event {
        string name;
        string description;
        uint256 price;
        uint256 maxTickets;      // Número máximo de ingressos
        uint256 ticketsSold;     // Número de ingressos vendidos
        bool isActive;           // Se o evento está ativo
    }

    // Mapeamentos
    mapping(uint256 => Event) public events;        // eventId => Event
    mapping(uint256 => uint256) public ticketToEvent; // tokenId => eventId
    mapping(uint256 => string) private _tokenURIs;  // tokenId => metadata URI

    uint256 public eventCount;

    // Eventos
    event EventCreated(
        uint256 indexed eventId,
        string name,
        uint256 price,
        uint256 maxTickets
    );

    event TicketPurchased(
        uint256 indexed eventId,
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );

    event EventCancelled(uint256 indexed eventId);

    constructor() ERC721("Festia Event Tickets", "FESTIA") Ownable(msg.sender) {}

    /**
     * @dev Cria um novo evento
     * @param name Nome do evento
     * @param description Descrição do evento
     * @param price Preço do ingresso em wei
     * @param maxTickets Número máximo de ingressos disponíveis
     */
    function createEvent(
        string calldata name,
        string calldata description,
        uint256 price,
        uint256 maxTickets
    ) external onlyOwner returns (uint256) {
        require(bytes(name).length > 0, "Nome nao pode estar vazio");
        require(bytes(description).length > 0, "Descricao nao pode estar vazia");
        require(price > 0, "Preco deve ser maior que zero");
        require(maxTickets > 0, "Numero de ingressos deve ser maior que zero");

        eventCount++;

        events[eventCount] = Event({
            name: name,
            description: description,
            price: price,
            maxTickets: maxTickets,
            ticketsSold: 0,
            isActive: true
        });

        emit EventCreated(eventCount, name, price, maxTickets);
        return eventCount;
    }

    /**
     * @dev Compra um ingresso para um evento
     * @param eventId ID do evento
     */
    function purchaseTicket(uint256 eventId) external payable nonReentrant returns (uint256) {
        require(eventId > 0 && eventId <= eventCount, "Evento nao existe");
        
        Event storage eventDetails = events[eventId];
        require(eventDetails.isActive, "Evento nao esta ativo");
        require(eventDetails.ticketsSold < eventDetails.maxTickets, "Ingressos esgotados");
        require(msg.value >= eventDetails.price, "Valor insuficiente");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        ticketToEvent[newTokenId] = eventId;
        eventDetails.ticketsSold++;

        // Devolve o excesso de pagamento
        if (msg.value > eventDetails.price) {
            (bool success, ) = payable(msg.sender).call{value: msg.value - eventDetails.price}("");
            require(success, "Falha ao devolver o excesso");
        }

        emit TicketPurchased(eventId, newTokenId, msg.sender, eventDetails.price);
        return newTokenId;
    }

    /**
     * @dev Cancela um evento
     * @param eventId ID do evento
     */
    function cancelEvent(uint256 eventId) external onlyOwner {
        require(eventId > 0 && eventId <= eventCount, "Evento nao existe");
        require(events[eventId].isActive, "Evento ja esta inativo");
        events[eventId].isActive = false;
        emit EventCancelled(eventId);
    }

    /**
     * @dev Retorna os detalhes de um evento
     * @param eventId ID do evento
     */
    function getEventDetails(uint256 eventId) external view returns (
        string memory name,
        string memory description,
        uint256 price,
        uint256 maxTickets,
        uint256 ticketsSold,
        bool isActive
    ) {
        require(eventId > 0 && eventId <= eventCount, "Evento nao existe");
        Event storage eventDetails = events[eventId];
        return (
            eventDetails.name,
            eventDetails.description,
            eventDetails.price,
            eventDetails.maxTickets,
            eventDetails.ticketsSold,
            eventDetails.isActive
        );
    }

    /**
     * @dev Retorna o evento associado a um ingresso
     * @param tokenId ID do token (ingresso)
     */
    function getTicketEvent(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "Token nao existe");
        return ticketToEvent[tokenId];
    }

    /**
     * @dev Retorna todos os eventos ativos com ingressos disponíveis
     */
    function getActiveEvents() external view returns (uint256[] memory) {
        uint256[] memory activeEventIds = new uint256[](eventCount);
        uint256 activeCount = 0;
        
        for(uint256 i = 1; i <= eventCount; i++) {
            if(events[i].isActive && events[i].ticketsSold < events[i].maxTickets) {
                activeEventIds[activeCount] = i;
                activeCount++;
            }
        }
        
        uint256[] memory result = new uint256[](activeCount);
        for(uint256 i = 0; i < activeCount; i++) {
            result[i] = activeEventIds[i];
        }
        
        return result;
    }

    /**
     * @dev Permite que o dono do contrato retire os fundos
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Nenhum saldo para sacar");
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Falha ao sacar");
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }
} 