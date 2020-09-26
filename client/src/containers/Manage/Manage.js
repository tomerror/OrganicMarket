import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Manage.module.css';
import axios from 'axios';
import { Logger, Items, Panel } from '../../components';
import UserContext from '../../context/user-context';

class Manage extends Component {
    state = {
        logs: [],
        filterLogs: [],
        tabs: [],
        filterProducts: [],
        redirect: null
    }

    static contextType = UserContext;

    componentDidMount = () => {
        console.log(this.props);
        this.getPanel();
    }

    getPanel = () => {
        this.props.clearError();
        axios({
            method: 'post',
            url: 'http://localhost:4000/manage/getPanel',
            headers: {},
            data: { username: this.context.user.username, password: this.context.user.password }
        }).then((response) => {
            this.setState({ logs: response.data, filterLogs: response.data })
            const tabs = []
            this.state.logs.map((l) => { if (!tabs.includes(l.username)) { tabs.push(l.username) } })
            this.setState({ tabs: tabs })
            //this.props.viewPage('manage')
        }, (error) => {
            let err = ''
            try { this.setState({ redirect: '/' }) }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.props.setError(err) }
        })
    }

    setDiscount = (product) => {
        this.props.clearError();
        axios({
            method: 'post',
            url: 'http://localhost:4000/manage/discount',
            headers: {},
            data: { username: this.context.user.username, password: this.context.user.password, product: product }
        }).then((response) => {
            this.props.reloadProduct();
            this.updateDiscount(product);
        }, (error) => {
            let err = ''
            try { this.setState({ redirect: '/' }) }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.props.setError(err) }
        })
    }

    setShow = (product) => {
        this.props.clearError();
        axios({
            method: 'post',
            url: 'http://localhost:4000/manage/productVisibility',
            headers: {},
            data: { username: this.context.user.username, password: this.context.user.password, product: product }
        }).then((response) => {
            this.props.reloadProduct();
            this.updateVisibility(product);
        }, (error) => {
            let err = ''
            try { this.setState({ redirect: '/' }) }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.props.setError(err) }
        })
    }

    counterInc = (product) => {
        this.props.clearError();
        axios({
            method: 'post',
            url: 'http://localhost:4000/manage/supplyInc',
            headers: {},
            data: { username: this.context.user.username, password: this.context.user.password, product: product.display }
        }).then((response) => {
            this.props.reloadProduct();
            this.updateSupply(product.display, 1);
        }, (error) => {
            let err = ''
            try { this.setState({ redirect: '/' }) }
            catch (error) { err = "A problem occurred at the server. Please try later" }
            finally { this.props.setError(err) }
        })
    }

    counterDec = (product) => {
        this.props.clearError();
        if (product.supply > 0) {
            axios({
                method: 'post',
                url: 'http://localhost:4000/manage/supplyDec',
                headers: {},
                data: { username: this.context.user.username, password: this.context.user.password, product: product.display }
            }).then((response) => {
                this.props.reloadProduct();
                this.updateSupply(product.display, -1);
            }, (error) => {
                let err = ''
                try { err = error.response.data }
                catch (error) { err = "A problem occurred at the server. Please try later" }
                finally { this.props.setError(err) }
            })
        }
    }

    updateSupply = (name, diff) => {
        let products = this.state.filterProducts.map((product) => {
            let editProduct = product
            if (product.display == name) {
                editProduct.supply = parseInt(product.supply) + diff
            }
            return editProduct
        })
        this.setState({ filterProducts: products })
    }

    changeSection = (section) => {
        this.setState({ filterLogs: this.state.logs.filter((log) => log.username == section.toLowerCase()) })
    }

    changeProducts = (value) => {
        this.setState({ productTab: value })
        this.setState({ filterProducts: this.props.products.filter((product) => product.type == value.toLowerCase()) })
    }

    updateDiscount = (name) => {
        let products = this.state.filterProducts.map((product) => {
            let editProduct = product
            if (product.display == name) {
                editProduct.discount = product.discount == 1 ? 0 : 1
            }
            return editProduct
        })
        this.setState({ filterProducts: products })
    }

    updateVisibility = (name) => {
        let products = this.state.filterProducts.map((product) => {
            let editProduct = product
            if (product.display == name) {
                editProduct.show = product.show == "true" ? "false" : "true"
            }
            return editProduct
        })
        this.setState({ filterProducts: products })
    }

    render = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const logs = this.state.filterLogs.map((log,key) => {
            return <Logger log={log} key={key}/>
        })

        return (
            <div className={styles.panel}>
                <Panel title="System Logs"
                    dropFunc={(e) => this.changeSection(e.target.value)}
                    select="Choose:"
                    droplist={this.state.tabs}>
                    {logs}
                </Panel>

                <Panel title="Products"
                    dropFunc={(e) => this.changeProducts(e.target.value)}
                    select="Choose:"
                    droplist={this.props.productTabs}>

                    <Items items={this.state.filterProducts}
                        panel={true}
                        counterInc={(p) => this.counterInc(p)}
                        counterDec={(p) => this.counterDec(p)}
                        iconFunc1={(s) => this.setDiscount(s)}
                        iconFunc2={(s) => this.setShow(s)} />
                </Panel>
            </div>
        )
    }
}

export default Manage;