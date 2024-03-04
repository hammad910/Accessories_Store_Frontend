import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Text,
    AspectRatio,
    Flex,
    Box
} from '@chakra-ui/react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";

import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";

import "./Header.scss";

const Header = () => {
    const { cartCount, categories } = useContext(Context)
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
                <div className="header-content">
                    <ul className="left">
                        <li onClick={() => navigate('/')}>Home</li>
                        <li>About</li>
                        <Menu>
                            <MenuButton _hover={{opacity:0.6}}>
                                <Flex >
                                    <Flex flexDirection={'column'}>
                                        <li className='categories'>Categories</li>
                                    </Flex>
                                    <Flex>
                                        <RiArrowDropDownLine fontSize={20} />
                                    </Flex>
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                {categories?.data?.map((item) => (
                                    <MenuItem minH='48px'key={item.id}  onClick={() => navigate(`/category/${item.id}`)}>
                                        <Text color='black'>{item.attributes.title}</Text>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </ul>
                    <div className="center" onClick={() => navigate('/')}>
                        Online Store
                    </div>
                    <div className="right">
                        <TbSearch onClick={() => setShowSearch(true)} />
                        <AiOutlineHeart />
                        <span className="cart-icon" >
                            <CgShoppingCart onClick={() => setShowCart(true)} />
                            {!!cartCount && <span>{cartCount}</span>}
                        </span>
                    </div>
                </div>
            </header>
            {showCart && <Cart setShowCart={setShowCart} />}
            {showSearch && <Search setShowSearch={setShowSearch} />}
        </>
    )
};

export default Header;
