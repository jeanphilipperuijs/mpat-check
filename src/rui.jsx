import React from 'react';
import ReactDOM from 'react-dom';
import CRUD from './crud';

class RUI extends React.PureComponent {
    constructor(props) {
        super(props);

        //WP REST API
        this.restUrlPage = `${window.wpApiSettings.root}${window.wpApiSettings.versionString}pages`; //default REST
        this.restUrlPageLayout = `${window.wpApiSettings.root}mpat/v1/layout`; //custom REST
        this.restUrlPageModel = `${window.wpApiSettings.root}mpat/v1/model`; //custom REST
        this.restUrlOptions = `${window.wpApiSettings.root}mpat/v1/option`; //custom REST
        this.isRestOk = true;
        this.state = {
            errMsg: null,
            availableLayouts: [],
            availableModels: [],
            availablePages: [],
            availableOptions: []
        };
    }

    componentWillMount() {
        if (wpApiSettings === undefined) {
            alert('wpApiSettings object not found!');
            this.setState({ errMsg: 'need WP API' });
        } else {
            if (window.wpApiSettings.nonce !== undefined) {
                //this.setState({ errMsg: 'Detected WP API' });
                this.modelIO = new CRUD(this.restUrlPageModel);
                this.layoutIO = new CRUD(this.restUrlPageLayout);
                this.optionIO = new CRUD(this.restUrlOptions);
                this.pageIO = new CRUD(this.restUrlPage);
            } else {
                this.setState({ errMsg: 'WP API nonce not set' });
            }
        }
    }

    componentDidMount() {
        // when the render() is done, load the content
        this.loadPageModels();
        this.loadPageLayouts();
        this.loadOptions();
        this.loadPages();
    }


    /** post */
    loadPages() {
        this.pageIO.get(
            (result) => {
                //                console.log(result);
                this.setState({ availablePages: result });
            },
            (e) => {
                console.log('loadPages', e);
                if (e.toString().indexOf('404') > -1) {
                    this.isRestOk = false;
                    this.setState({
                        errMsg: `Missing the custom REST for Page Models ${this.restUrlPages}. Have you installed "mpat-core-plugin" ?`
                    });
                } else {
                    this.setState({
                        errMsg: `${this.restUrlPages} gave ${e.toString()}`
                    });
                }
            });
    }


    /** options */
    loadOptions() {
        this.optionIO.get(
            (result) => {
                console.log('loadOptions rseult', result);
                this.setState({ availableOptions: result });
            },
            (e) => {
                console.log('loadOptions', e);
                try {
                    if (e.toString().indexOf('404') > -1) {
                        this.isRestOk = false;
                        this.setState({
                            errMsg: `Missing the custom REST for Page Models ${this.restUrlOptions}. Have you installed "mpat-core-plugin" ?`
                        });
                    } else { this.setState({ errMsg: e }) };
                } catch (err) {
                    this.setState({
                        errMsg: `${this.restUrlOptions} gave ${e.toString()}`
                    });
                }
            });
    }

    /** model */
    loadPageModels() {
        this.modelIO.get(
            (result) => {
                const urls = [];
                for (const item of result) {
                    const obj = {};
                    obj.id = item.ID;
                    obj.key = `page://${item.ID}`;
                    obj.label = item.post_title !== '' ? item.post_title : 'no title';
                    obj.disabled = false;
                    urls.push(obj);
                }
                this.setState({ availableModels: urls });
            },
            (e) => {
                console.log('loadPageModels', e);
                if (e.toString().indexOf('404') > -1) {
                    this.isRestOk = false;
                    this.setState({
                        errMsg: `Missing the custom REST for Page Models ${this.restUrlPageModel}. Have you installed "mpat-core-plugin" ?`
                    });
                } else {
                    this.setState({
                        errMsg: `${this.restUrlPageModel} gave ${e.toString()}`
                    });
                }
            });
    }


    /** layout */
    loadPageLayouts() {
        this.layoutIO.get(
            (result) => {
                const urls = [];
                for (const item of result) {
                    const obj = {};
                    obj.id = item.ID;
                    obj.key = `page://${item.ID}`;
                    obj.label = item.post_title !== '' ? item.post_title : 'no title';
                    obj.disabled = false;
                    urls.push(obj);
                }
                this.setState({ availableLayouts: urls });
            },
            (e) => {
                console.log('loadPageLayouts', e);
                if (e.toString().indexOf('404') > -1) {
                    this.isRestOk = false;
                    this.setState({
                        errMsg: `Missing the custom REST for Page Layouts ${this.restUrlPageLayout}. Have you installed "mpat-core-plugin" ?`
                    });
                } else {
                    this.setState({
                        errMsg: `${this.restUrlPageLayout} gave ${e.toString()}`
                    });
                }
            });
    }

    createNewLayout() {
        console.log('createNewLayout');
        this.layoutIO.post(
            {
                post_type: 'page_layout',
                post_status: 'publish',
                post_title: this.state.newPageLayoutTitle,
                mpat_content: {
                    layout: this.state.layout
                }
            },
            (a) => {
                const id = a.data.id !== undefined ? a.data.id : a.data.ID;
                // const title = a.data.post_title !== undefined ? a.data.post_title : a.data.title;
                this.setState({
                    layoutId: id,
                    stepTag: 'page',
                    workFlow: 'layout'
                });
            },
            (e) => {
                this.setState({
                    stepTag: 'layout',
                    errMsg: e
                });
            });
    };

    createNewModel() {
        console.log('createNewModel');
        this.modelIO.post(
            {
                post_type: 'page_model',
                post_status: 'publish',
                post_title: this.state.newPageModelTitle,
                mpat_content: {
                    //  model: this.state.model
                }
            },
            (a) => {
                // depending of the (custom)rest service , id/ID key may be different
                const id = a.data.id !== undefined ? a.data.id : a.data.ID;
                // const title = a.data.post_title !== undefined ? a.data.post_title : a.data.title;
                this.setState({
                    modelId: id,
                    workFlow: 'model',
                    stepTag: 'page'
                });
            },
            (e) => {
                this.setState({
                    stepTag: 'layout',
                    errMsg: e
                });
            });
    }

    createNewPage() {
        console.log('createNewPage');
        this.pageIO.post(
            {
                type: 'page',
                status: 'publish',
                title: this.state.newPageTitle,
                parent: this.state.postParent,
                mpat_content: {
                    layoutId: this.state.layoutId
                }
            },
            (a) => {
                const id = Number(a.data.id);
                this.setState(
                    {
                        stepTag: 'done'
                    }
                );
            },
            (e) => {
                this.setState({
                    errMsg: e
                });
            });
    }

    errorblock() {
        if (this.state.errMsg) {
            return (<div><h4>Errors</h4>
                <strong>{this.state.errMsg}</strong>
            </div>);
        } return null;
    }

    blok(t, o) {
        try {
            return (<details>
                <summary>{o.length} {t.toLowerCase()} </summary>
                <ul>{o.map((l) => { return (<li>{l.id} {l.label || l.title.rendered}</li>) })} </ul>
                <hr />

            </details>);
        } catch (err) {

        }
        return null;
    }

    blokoption(t, o) {
        try {
            let keyz = Object.keys(o);
            keyz.sort();
            return (<details>
                <summary>{keyz.length} {t.toLowerCase()}</summary>
                <div>{
                    keyz.map((l) => {
                        if (l.toLowerCase().indexOf('mpat') == 0
                            || l.toLowerCase().indexOf('mpo') == 0
                            || l.toLowerCase().indexOf('timeline') == 0
                            || l.toLowerCase().indexOf('tooltips') == 0) {
                            return this.kv(l, o[l], { color: '#25c1b2' });
                        }
                        else {
                            return this.kv(l, o[l], { color: 'gray' });
                        }
                    })
                }</div>
                <hr />
            </details>);
        } catch (err) {
            console.log(err);
        }
    }

    blokplugins(t, o) {
        try {
            let keyz = Object.keys(o);
            keyz.sort();
            return (<details>
                <summary>{keyz.length} {t.toLowerCase()}</summary>
                <div>{
                    keyz.map((p) => {
                        let q = o[p];
                        console.log(q);
                        let l = q.Name;
                        if (l.toLowerCase().indexOf('mpat') == 0
                            || l.toLowerCase().indexOf('mpo') == 0
                            || l.toLowerCase().indexOf('timeline') == 0
                            || l.toLowerCase().indexOf('tooltips') == 0) {
                            return this.kv(`${q.Name} v${q.Version}`, this.blokplugin(q), { color: '#25c1b2' });
                        }
                        else {
                            return this.kv(`${q.Name} v${q.Version}`, q);
                        }
                    })
                }</div>
                <hr />
            </details>);
        } catch (err) {
            console.log(err);
        }
    }
    blokplugin(q) {
        return (<span>

            <blockquote>{q.Description}</blockquote><ul>
                {this.lv('PluginURI', <a href={q.PluginURI} target="_blank">{q.PluginURI}</a>)}
                {this.lv('Author', q.Author)}
                {this.lv('AuthorURI', <a href={q.AuthorURI} target="_blank">{q.AuthorURI}</a>)}
            </ul>
        </span>);
    }
    lv(l, v) {
        return (<li><label>{l}</label><span style={{ float: 'right', paddingRight: '50px' }}>{v}</span></li>);

    }
    kv(k, v, s) {
        let cnt = v;
        if (typeof v === 'object') {
            try {
                cnt = <pre style={{ fontSize: '0.8em' }}>{JSON.stringify(v, null, 3)}</pre>;
            } catch (err) { }
        }
        return (<details><summary><label style={s}>{k}</label></summary>{cnt}</details>);
    }

    render() {

        return (<div>
            {this.errorblock()}

            {this.blok('Pages', this.state.availablePages)}

            {this.blok('Layouts', this.state.availableLayouts)}

            {this.blok('Models', this.state.availableModels)}

            {this.blokoption('Options', this.state.availableOptions)}

            {this.blokplugins('Plugins', plugins)}
        </div>);
    }
}


ReactDOM.render(<RUI />, document.getElementById('rui'));
