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
        bool isActive;
        bool isSold;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => uint256) public ticketToEvent;
    uint256 public eventCount;

    event EventCreated(
        uint256 indexed eventId,
        string name,
        uint256 price
    );

    event TicketPurchased(
        uint256 indexed eventId,
        uint256 indexed tokenId,
        address buyer
    );

    constructor() ERC721("Event Ticket NFT", "TICKET") Ownable(msg.sender) {
        eventCount = 0;
    }

    function createEvent(
        string calldata name,
        string calldata description,
        uint256 price
    ) public onlyOwner returns (uint256) {
        require(bytes(name).length > 0, "Nome nao pode estar vazio");
        require(bytes(description).length > 0, "Descricao nao pode estar vazia");
        require(price > 0, "Preco deve ser maior que zero");

        unchecked {
            eventCount++;
        }

        events[eventCount] = Event({
            name: name,
            description: description,
            price: price,
            isActive: true,
            isSold: false
        });

        emit EventCreated(eventCount, name, price);
        return eventCount;
    }

    function purchaseTicket(uint256 eventId) public payable nonReentrant returns (uint256) {
        require(eventId > 0 && eventId <= eventCount, "Evento nao existe");
        
        Event storage eventDetails = events[eventId];
        require(eventDetails.isActive, "Evento nao esta ativo");
        require(!eventDetails.isSold, "Ingresso ja foi vendido");
        require(msg.value >= eventDetails.price, "Valor insuficiente");

        unchecked {
            _tokenIds.increment();
        }
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        ticketToEvent[newTokenId] = eventId;
        eventDetails.isSold = true;

        if (msg.value > eventDetails.price) {
            uint256 refund = msg.value - eventDetails.price;
            (bool success, ) = payable(msg.sender).call{value: refund}("");
            require(success, "Falha ao devolver o excesso");
        }

        emit TicketPurchased(eventId, newTokenId, msg.sender);
        return newTokenId;
    }

    function cancelEvent(uint256 eventId) public onlyOwner {
        require(eventId > 0 && eventId <= eventCount, "Evento nao existe");
        require(events[eventId].isActive, "Evento ja esta inativo");
        events[eventId].isActive = false;
    }

    function getEventDetails(uint256 eventId) public view returns (
        string memory name,
        string memory description,
        uint256 price,
        bool isActive,
        bool isSold
    ) {
        require(eventId > 0 && eventId <= eventCount, "Evento nao existe");
        Event storage eventDetails = events[eventId];
        return (
            eventDetails.name,
            eventDetails.description,
            eventDetails.price,
            eventDetails.isActive,
            eventDetails.isSold
        );
    }

    function getTicketEvent(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Token nao existe");
        return ticketToEvent[tokenId];
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Nenhum saldo para sacar");
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Falha ao sacar");
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }

    function getActiveEvents() public view returns (uint256[] memory) {
        uint256[] memory activeEventIds = new uint256[](eventCount);
        uint256 activeCount = 0;
        
        for(uint256 i = 1; i <= eventCount; i++) {
            if(events[i].isActive && !events[i].isSold) {
                activeEventIds[activeCount] = i;
                activeCount++;
            }
        }
        
        // Criar array do tamanho exato
        uint256[] memory result = new uint256[](activeCount);
        for(uint256 i = 0; i < activeCount; i++) {
            result[i] = activeEventIds[i];
        }
        
        return result;
    }
} 