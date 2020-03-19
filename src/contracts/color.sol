pragma solidity ^0.5.0;

//import "node_modules\@openzeppelin\contracts\token\ERC721\ERC721Full.sol";
import "./ERC721Full.sol";

contract Color is ERC721Full{

string[] public colors;
mapping(string => bool) _colorexist;

constructor() ERC721Full("color","COLOR") public {}

function mint(string memory _color) public {

    require(!_colorexist[_color],'color already exist');
    uint id = colors.push(_color);
    _mint(msg.sender,id);
    _colorexist[_color] = true;
}
}