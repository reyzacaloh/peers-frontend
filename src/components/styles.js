import { Link } from "react-router-dom";
import styled from "styled-components";

import { css } from "styled-components";

export const darkTheme = {
    bg: "rgb(15,15,15)",
    bgAlpha: "rgba(0,0,0,.3)",
    bg2: "rgb(30,30,30)",
    bg3: "rgb(50,50,50)",
    text: "rgb(210,210,210)",
    primary: "rgb(52, 131, 235)",
};
const v = {
    sidebarWidth: `300px`,
    smSpacing: `8px`,
    mdSpacing: `16px`,
    lgSpacing: `24px`,
    xlSpacing: `32px`,
    xxlSpacing: `48px`,
    borderRadius: `6px`,
};

const btnReset = css`
    font-family: inherit;
    outline: none;
    border: none;
    background: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
`;

export const SSidebar = styled.div`
    width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidth)};
    background: #279686;
    min-height: 100vh;
    height: relative;
    padding: ${v.lgSpacing};
    position: relative;
    color: white;
    font-weight: bold;
`;

export const SSidebarButton = styled.button`
    ${btnReset};
    position: absolute;
    top: ${v.xxlSpacing};
    right: ${({ isOpen }) => (isOpen ? `-16px` : `-10px`)};
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #279686;
    box-shadow: 0 0 4px , 0 0 7px #279686;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
`;

export const SLogo = styled.div`
    width: 52px;
    img {
        max-width: 100%;
        height: auto;
    }
    cursor: pointer;
    margin-bottom: ${v.lgSpacing};
`;

export const SSearch = styled.div`
    background: white;
    border: 1px solid ;
    border-radius: ${v.borderRadius};
    input {
        padding: 0 ${v.smSpacing};
        font-family: inherit;
        letter-spacing: inherit;
        font-size: 16px;
        width: 100%;
        outline: none;
        border: none;
        color: inherit;
        background: transparent;
    }
    display: flex;
`;

export const SSearchIcon = styled.button`
    ${btnReset};
    padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing};
    display: flex;
    cursor: pointer;
    svg {
        font-size: 20px;
    }
`;

export const SDivider = styled.div`
    height: 1px;
    width: 100%;
    background: #fff;
    margin: ${v.lgSpacing} 0;
`;

export const SLinkContainer = styled.div`
    background: ${({ theme, isActive }) => (!isActive ? `transparent` : theme.bg3)};
    border-radius: ${v.borderRadius};
    margin: 8px 0;
    :hover {
        box-shadow: inset 0 0 0 1px ;
    }
`;

export const SLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    padding: calc(${v.smSpacing} - 2px) 0;
`;

export const SLinkIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;
    svg {
        font-size: 20px;
    }
`;

export const SLinkLabel = styled.span`
    display: block;
    flex: 1;
    margin-left: ${v.smSpacing};
`;

export const SLinkNotification = styled.div`
    font-size: 14px;
    padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
    border-radius: calc(${v.borderRadius} / 2);
    background: ${({ theme }) => theme.primary};
    color: white;
    margin-right: ${v.mdSpacing};
`;

export const STheme = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
`;
export const SThemeLabel = styled.span`
    display: block;
    flex: 1;
`;
export const SThemeToggler = styled.button`
    ${btnReset};
    margin: 0 auto;
    cursor: pointer;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background: ${({ theme, isActive }) => (!isActive ? theme.bg3 : theme.primary)};
    position: relative;
`;

export const SToggleThumb = styled.div`
    height: 18px;
    width: 18px;
    position: absolute;
    top: 1px;
    bottom: 1px;
    transition: 0.2s ease right;
    right: calc(100% - 18px - 1px);
    border-radius: 50%;
    background: #279686;
`;

export const SLayout = styled.div`
    display: flex;
`;

export const SMain = styled.main`
    padding: calc(${v.smSpacing} * 2);
    h1 {
        font-size: 14px;
    }
`;