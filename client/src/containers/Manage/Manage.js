import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Manage.module.css';
import { Logger, Items, Panel } from '../../components';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import utils from '../../utils';
class Manage extends Component {
    state = {
        filterLog: '',
        category: ''
    }

    componentDidMount = () => {
        this.getPanel();
    }

    getPanel = () => {
        this.props.fetchAdminData(this.props.user.username, this.props.user.password);
    }

    setDiscount = (product) => {
        this.props.setProductDiscount(this.props.user.username, this.props.user.password, product);
    }

    setShow = (product) => {
        this.props.toggleProductVisibility(this.props.user.username, this.props.user.password, product);
    }

    counterInc = (product) => {
        this.props.incrementProductSupply(this.props.user.username, this.props.user.password, product.display)
    }

    counterDec = (product) => {
        if (product.supply > 0) {
            this.props.decrementProductSupply(this.props.user.username, this.props.user.password, product.display)
        }
    }

    changeSection = (value) => {
        this.setState({ filterLog: value })
    }

    changeProducts = (value) => {
        this.setState({ category: value })
    }

    render = () => {
        let filterLogs = []
        if(this.state.filterLog == ''){
            filterLogs = this.props.user.logs;
        } else {
            filterLogs = this.props.user.logs.filter(log => log.username == this.state.filterLog.toLowerCase());
        }

        const logs = filterLogs.map((log, key) => {
            return <Logger log={log} key={key} />
        })

        let filterProducts = this.props.products.filter(product => product.type == this.state.category.toLowerCase())
        
        let tabs = utils.reduceDuplicateByUsername(this.props.user.logs)
        
        return (
            <div>
                { this.props.user.username == '' ? <Redirect to="/login" /> :
                    <div className={styles.panel}>
                        <Panel title="System Logs"
                            dropFunc={(e) => this.changeSection(e.target.value)}
                            select="Choose:"
                            droplist={tabs}>
                            {logs}
                        </Panel>

                        <Panel title="Products"
                            dropFunc={(e) => this.changeProducts(e.target.value)}
                            select="Choose:"
                            droplist={this.props.productTabs}>

                            <Items items={filterProducts}
                                panel={true}
                                counterInc={(p) => this.counterInc(p)}
                                counterDec={(p) => this.counterDec(p)}
                                iconFunc1={(s) => this.setDiscount(s)}
                                iconFunc2={(s) => this.setShow(s)} />
                        </Panel>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        products: state.products.products
    }
}    

const mapDispatchToProps = dispatch => {
    return {
        setProductDiscount: (username, password, product) => dispatch(actionCreators.setProductDiscount(username, password, product)),
        toggleProductVisibility: (username, password, product) => dispatch(actionCreators.toggleProductVisibility(username, password, product)),
        incrementProductSupply: (username, password, product) => dispatch(actionCreators.incrementProductSupply(username, password, product)),
        decrementProductSupply: (username, password, product) => dispatch(actionCreators.decrementProductSupply(username, password, product)),
        fetchAdminData: (username, password) => dispatch(actionCreators.fetchAdminData(username, password))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Manage);