import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import uuid from 'uuid';
import { caretDown } from 'react-icons-kit/fa';
import '../css/Dropdown.css';

/**
 * If list is an object, selectedValue is an id
 * If list is an array, selectedValue is the value of the index
 */
export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListHidden: true,
        };
        this.dropdown = null;
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
        document.addEventListener('keydown', this.handleTab, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
        document.removeEventListener('keydown', this.handleTab, false);
    }

    // this function ensures proper closing/opening of our dropdownList list
    handleClick = clickedItem => {
        if (this.dropdown === null) {
            return;
        }
        // page isn't fully loaded yet or clickedItem is inside our dropdownList
        if (this.dropdown.contains(clickedItem.target)) {
            return;
        }
        this.setState({ isListHidden: true });
    };

    handleTab = event => {
        if (event.code === 'Tab') {
            this.closeDropdownList();
        }
    };

    closeDropdownList = () => {
        this.setState({
            isListHidden: true,
        });
    };

    openDropdownList = () => {
        this.setState({
            isListHidden: false,
        });
    };

    selectValue = value => {
        this.props.onChange(value);
        this.setState({ isListHidden: true });
    };

    renderEmptyList = () => {
        return <div className="dropdownListItem">Nothing to show here!</div>;
    };

    renderList = () => {
        let renderedList = [];
        const list = this.props.list;
        if (list instanceof Array) {
            if (list.length === 0) {
                return this.renderEmptyList();
            }

            list.forEach(value => {
                renderedList.push(
                    <div
                        className={
                            'dropdownListItem' +
                            (this.props.selectedValue === value ? ' selectedListItem' : '')
                        }
                        key={uuid.v4()}
                        onClick={() => this.selectValue(value)}
                    >
                        {value}
                    </div>
                );
            });
        }
        // List is an Object
        else {
            const valueKeys = Object.keys(list);
            if (valueKeys.length === 0) {
                return this.renderEmptyList();
            }

            valueKeys.forEach(id => {
                renderedList.push(
                    <div
                        className={
                            'dropdownListItem' +
                            (this.props.selectedValue === id ? ' selectedListItem' : '')
                        }
                        key={uuid.v4()}
                        onClick={() => this.selectValue(id)}
                    >
                        {list[id].name}
                    </div>
                );
            });
        }
        return renderedList;
    };

    renderSelection = () => {
        const list = this.props.list;
        let value = '';
        if (this.props.selectedValue === '' || this.props.selectedValue === null) {
            value = this.props.placeholder;
        } else if (list instanceof Array) {
            value = this.props.selectedValue;
        } else {
            value = list[this.props.selectedValue].name;
        }

        return (
            <div className="dropdownSelection" onClick={this.openDropdownList}>
                <div className="dropdownSelectedValue">{value}</div>
                <div className="dropdownCaretContainer">
                    <Icon icon={caretDown} size={32} className="dropdownCaret" />
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="dropdownContainer">
                <div>{this.renderSelection()}</div>
                <div
                    className="dropdownList"
                    ref={dropdown => (this.dropdown = dropdown)}
                    hidden={this.state.isListHidden}
                >
                    {this.renderList()}
                </div>
            </div>
        );
    }
}
