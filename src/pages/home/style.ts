import styled, {css} from "styled-components";

import {shade} from "polished";

interface FormProps{
    hasError: boolean,
}

export const Title = styled.h1`
    font-size: 48px;
    color:#3a3a3a;
    max-width: 650px;
    line-height: 56px;
    margin-top: 80px;
`

export const Form = styled.form<FormProps>`
margin-top:40px;
max-width: 700px;
display:flex;
input{
    flex: 1;
    padding: 0 24px;
    height:70px;
    border:0;
    border-radius: 5px 0 0 5px;

    ${(props) => props.hasError && css`
        border: 2px solid red;
    `}

    &::placeholder{
        color: #a8a8b3;
    }
}
button{
    width:200px;
    height: 70px;
    background: #00D25A;
    border: 0;
    border-radius: 0 5px 5px 0;
    color: #fff;
    font-weight: bold;
    transition: .5s;
    &:hover{
        transition: .5s;
        background: ${shade(0.1,'#00D25A')};
    }
}
`

export const Repositories = styled.div`
    margin-top: 80px;
    max-width: 700px;
a{
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: flex;
    text-decoration: none;
    align-items: center;
    transition: .5s;

    &:hover{
        transform: translateX(10px)
    }

    & + a{
        margin-top: 18px;
    }

    img{
        width: 65px;
        height: 65px;
        border-radius: 50%;
    }
    
    div{
        margin-left: 16px;
        strong{
            font-size: 20px;
            color: #3D3D4d;
        }
        p{
            font-size: 18px;
            color: #cbcbd6;
        }
    }
    svg{
        margin-left: auto;
        color: #3D3D4d;
    }
}
`

export const Error = styled.span`
    display: block;
    color: red;
    margin-top: 10px;
    
`