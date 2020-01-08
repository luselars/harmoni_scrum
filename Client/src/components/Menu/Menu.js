//@flow
import React from 'react';
import {Component} from 'react';

type Props= {}

class Menu extends Component<Props> { 
    constructor(props: any){
        super(props);
    }
    render() {
        return(
            <nav class="navbar navbar-light bg-black">
                <a class="navbar-brand" href="#">HARMONI</a>
            </nav>
        )
    }
}

export default Menu;