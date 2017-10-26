import React from 'react';
import ReactDOM from 'react-dom';
import CRUD from './crud';

class RUI extends React.PureComponent {
    constructor(props) {
        super(props);
        this.pluginCompare = {
            "enhanced-media-library/enhanced-media-library.php": {
                "Name": "Enhanced Media Library", "PluginURI": "http://wpUXsolutions.com", "Version": "2.4.5", "Description": "This plugin will be handy for those who need to manage a lot of media files.", "Author": "wpUXsolutions", "AuthorURI": "http://wpUXsolutions.com", "TextDomain": "enhanced-media-library", "DomainPath": "/languages", "Network": false, "Title": "Enhanced Media Library", "AuthorName": "wpUXsolutions"
            },
            "basic-auth/basic-auth.php": {
                "Name": "JSON Basic Authentication", "PluginURI": "https://github.com/WP-API/Basic-Auth", "Version": "0.1", "Description": "Basic Authentication handler for the JSON API, used for development and debugging purposes", "Author": "WordPress API Team", "AuthorURI": "https://github.com/WP-API", "TextDomain": "basic-auth", "DomainPath": "", "Network": false, "Title": "JSON Basic Authentication", "AuthorName": "WordPress API Team"
            },
            "mbop-remover/mbop-remover.php": {
                "Name": "MBOP remover", "PluginURI": "/mbop", "Version": "1.0.1", "Description": "Delete current user meta's 'meta-box-order_page'", "Author": "Jean-Philippe Ruijs", "AuthorURI": "https://github.com/MPAT-eu", "TextDomain": "mbop-remover", "DomainPath": "/languages", "Network": false, "Title": "MBOP remover", "AuthorName": "Jean-Philippe Ruijs"
            },
            "members/members.php": {
                "Name": "Members", "PluginURI": "http://themehybrid.com/plugins/members", "Version": "1.1.1", "Description": "A user and role management plugin that puts you in full control of your site's permissions. This plugin allows you to edit your roles and their capabilities, clone existing roles, assign multiple roles per user, block post content, or even make your site completely private.", "Author": "Justin Tadlock", "AuthorURI": "http://themehybrid.com", "TextDomain": "members", "DomainPath": "/languages", "Network": false, "Title": "Members", "AuthorName": "Justin Tadlock"
            },
            "mpat-asset-api/AssetAPI.php": {
                "Name": "Mpat-asset-api", "PluginURI": "http://www.finconsgroup.com/", "Version": "0.1-alpha", "Description": "This plugin manage the integration of MPAT with intial external repositories, namely the MPAT asset converter and a TVAnytime repository", "Author": "Fincons Group", "AuthorURI": "http://www.finconsgroup.com/", "TextDomain": "mpat", "DomainPath": "/languages", "Network": false, "Title": "Mpat-asset-api", "AuthorName": "Fincons Group"
            },
            "mpat-plugins/mpat-core.php": {
                "Name": "MPAT core plugin", "PluginURI": "http://www.mpat.eu", "Version": "1.0.0", "Description": "Main MPAT plugins which includes the most of core modules.", "Author": "MPAT", "AuthorURI": "http://www.mpat.eu", "TextDomain": "mpat", "DomainPath": "", "Network": false, "Title": "MPAT core plugin", "AuthorName": "MPAT"
            },
            "cpo/mpat-cpo.php": {
                "Name": "MPAT Custom Posts Order", "PluginURI": "https://github.com/MPAT-eu/cpo", "Version": "1.1.1", "Description": "Settingless Custom Post Order", "Author": "Jean-Philippe Ruijs", "AuthorURI": "https://github.com/MPAT-eu/", "TextDomain": "mpat-cpo", "DomainPath": "/languages", "Network": false, "Title": "MPAT Custom Posts Order", "AuthorName": "Jean-Philippe Ruijs"
            },
            "mpat-explorer/Explorer.php": {
                "Name": "MPAT Explorer", "PluginURI": "https://github.com/MPAT-eu/mpat-explorer/", "Version": "1.0.2", "Description": "Explorer MPAT sites", "Author": "Jean-Claude Dufourd", "AuthorURI": "https://github.com/MPAT-eu/", "TextDomain": "mpat-explorer", "DomainPath": "/languages", "Network": false, "Title": "MPAT Explorer", "AuthorName": "Jean-Claude Dufourd"
            },
            "mpat-health-check/mpat-health-check.php": {
                "Name": "MPAT Health Check", "PluginURI": "https://github.com/jeanphilipperuijs/mpat-health-check", "Version": "0.5.0", "Description": "Checks the health of your WordPress install.", "Author": "The WordPress.org community", "AuthorURI": "https://github.com/jeanphilipperuijs/mpat-health-check", "TextDomain": "mpat-health-check", "DomainPath": "", "Network": false, "Title": "MPAT Health Check", "AuthorName": "The WordPress.org community"
            },
            "mpat-importexport/ImportExport.php": {
                "Name": "MPAT ImportExport", "PluginURI": "https://github.com/aureliendavid/mpat-importexport/", "Version": "1.0.beta", "Description": "Import and export MPAT pages and layout", "Author": "Aurelien David", "AuthorURI": "https://github.com/aureliendavid/", "TextDomain": "mpat-importexport", "DomainPath": "/languages", "Network": false, "Title": "MPAT ImportExport", "AuthorName": "Aurelien David"
            },
            "mpat-newpage-wizard/NewPage.php": {
                "Name": "MPAT New Page Wizard", "PluginURI": "https://github.com/jeanphilipperuijs/mpat-newpage-wizard/", "Version": "2.0.3", "Description": "Wizard for creating new pages for MPAT", "Author": "Jean-Philippe Ruijs", "AuthorURI": "https://github.com/jeanphilipperuijs/", "TextDomain": "mpat-newpage-wizard", "DomainPath": "/languages", "Network": false, "Title": "MPAT New Page Wizard", "AuthorName": "Jean-Philippe Ruijs"
            },
            "mpat-360/mpat_360.php": {
                "Name": "MPAT_360", "PluginURI": "http://www.mpat.eu", "Version": "1.0.0", "Description": "video360 component", "Author": "MPAT", "AuthorURI": "http://www.mpat.eu", "TextDomain": "mpat-360", "DomainPath": "/languages", "Network": false, "Title": "MPAT_360", "AuthorName": "MPAT"
            },
            "rewrite-rules-inspector/rewrite-rules-inspector.php": {
                "Name": "Rewrite Rules Inspector", "PluginURI": "http://wordpress.org/extend/plugins/rewrite-rules-inspector/", "Version": "1.2.1", "Description": "Simple WordPress Admin view for inspecting your rewrite rules", "Author": "Daniel Bachhuber, Automattic", "AuthorURI": "http://automattic.com/", "TextDomain": "rewrite-rules-inspector", "DomainPath": "", "Network": false, "Title": "Rewrite Rules Inspector", "AuthorName": "Daniel Bachhuber, Automattic"
            },
            "wp-crontrol/wp-crontrol.php": {
                "Name": "WP Crontrol", "PluginURI": "https://wordpress.org/plugins/wp-crontrol/", "Version": "1.3.1", "Description": "WP Crontrol lets you view and control what's happening in the WP-Cron system.", "Author": "<a href=\"https://johnblackbourn.com/\">John Blackbourn</a> & <a href=\"http://www.scompt.com/\">Edward Dale</a>", "AuthorURI": "", "TextDomain": "wp-crontrol", "DomainPath": "/languages/", "Network": false, "Title": "WP Crontrol", "AuthorName": "<a href=\"https://johnblackbourn.com/\">John Blackbourn</a> & <a href=\"http://www.scompt.com/\">Edward Dale</a>"
            }
        };
        this.mpatgithub = 'https://github.com/MPAT-eu';
        this.noConfirm = true;
        this.mpatColor = '#25c1b2';
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
        console.log('constructor',
            JSON.stringify(Object.keys(this.pluginCompare), null, 3),
            JSON.stringify(Object.keys(plugins), null, 3),
        );
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
                console.log('loadPages', result);
                this.setState({ availablePages: result });
            },
            (e) => {
                console.error('loadPages', e);
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
                console.log('loadOptions', result);
                this.setState({ availableOptions: result });
            },
            (e) => {
                console.error('loadOptions', e);
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
                console.log('loadPageModels', result);
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
                console.error('loadPageModels', e);
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
                console.log('loadPageLayouts', result);
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
                console.error('loadPageLayouts', e);
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
                post_status: 'draft',
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

    getInfoPost(t, o) {
        return (<details>
            <summary>{o.length || 'No'} {t.toLowerCase()} </summary>
            <ul>{o.map((l) => { return (<li>{l.id} {l.label || l.title.rendered}</li>) })} </ul>
            <hr />

        </details>);
        return null;
    }

    getInfoOptions(t, o) {
        let keyz = Object.keys(o);
        keyz.sort();
        return (<details>
            <summary>{keyz.length} {t.toLowerCase()}</summary>
            <div>{
                keyz.map((l) => {
                    return this.metaDataInfo(l, o[l], { color: 'gray' }, this.optionIO);
                })
            }</div>
            <hr />
        </details>);
    }

    getInfoPlugins(t, o) {
        let pluginsPaths = Object.keys(o);
        pluginsPaths.sort();
        return (<details>
            <summary>{pluginsPaths.length} {t.toLowerCase()}</summary>
            <div>{
                pluginsPaths.map((pluginPath) => {
                    let data = o[pluginPath];
                    let msgs = [];
                    let msg = null;
                    let compareName = undefined;
                    try {
                        compareName = this.pluginCompare[pluginPath].Name;
                        msg = `PluginPath ${pluginPath}`;
                        msgs.push({ msg: msg, ok: true });
                    }
                    catch (err) {
                        //console.error(err);
                        msg = `${pluginPath} not found`;
                        msgs.push({ msg: msg, ok: false });
                    }

                    if (compareName != undefined && compareName == data.Name) {
                        let bgcolor = null;

                        /* version check */
                        let ok;
                        try {
                            msg = 'Latest version';
                            ok = true;
                            if (+this.pluginCompare[pluginPath].Version > +data.Version) {
                                bgcolor = 'red';
                                msg = `Update to ${this.pluginCompare[pluginPath].Version} `;
                                ok = false;
                            }
                            msgs.push({ msg: msg, ok: ok });
                        } catch (err) {
                            console.log('v', err);
                        }

                        /* host repo check */
                        try {
                            msg = `Check hosting "${this.mpatgithub}" or verify PluginURI`;
                            ok = false;
                            if (data.PluginURI.indexOf('github.com/MPAT-eu') > -1) {
                                msg = 'Is correctly hosted';
                                ok = true;
                            }
                            msgs.push({ msg: msg, ok: ok });
                        } catch (err) {
                            console.log('v', err);
                        }

                        return this.metaDataInfo(`${data.Name} v${data.Version} `, this.getPluginInfo(data, msgs), { color: this.mpatColor, backgroundColor: bgcolor });
                    }
                    else {
                        return this.metaDataInfo(`${data.Name} v${data.Version} `, this.getPluginInfo(data, [(<span style={{ color: 'red' }}>Exotic PluginPath ${pluginPath}</span>)]));
                    }
                })
            }</div>
            <hr />
            <textarea>{JSON.stringify(plugins)}</textarea>
        </details>);


    }

    getPluginInfo(q, msgs) {
        return (
            <div>
                <blockquote>{q.Description}</blockquote>
                <ul style={{ width: '90%', left: '50px' }}>
                    {msgs.map((msg) => {
                        return this.pluginMetaData(msg.msg, msg.ok ? 'Passed' : 'Verify', { color: msg.ok ? 'green' : 'red' });
                        /*return (<li style={{ color: msg.ok ? 'green' : 'red' }}>
                            <label>{msg.msg}</label>
                            <span style={{ float: 'right', width: '90%', paddingRight: '50px' }}>{msg.ok ? 'Passed' : 'Verify'}</span>
                        </li>);*/
                    })}
                    {this.pluginMetaData('PluginURI', this.makelink(q.PluginURI))}
                    {this.pluginMetaData('AuthorURI', this.makelink(q.AuthorURI))}
                    {this.pluginMetaData('Author', q.Author)}
                </ul>
            </div>);
    }
    makelink(src, target = '_blank') {
        return (<a href={src} target={target}>{src}</a>);
    }
    pluginMetaData(k, v, style = {}) {
        return (<li style={style}><label>{k}</label><span style={{ float: 'right', paddingRight: '50px' }}>{v}</span></li>);
    }

    metaDataInfo(key, value, style = {}, crudCallback = undefined) {
        let styleSheet = Object.assign({}, style);

        if (key.toLowerCase().indexOf('mpat') == 0
            || key.toLowerCase().indexOf('mpo') == 0
            || key.toLowerCase().indexOf('timeline') == 0
            || key.toLowerCase().indexOf('tooltips') == 0) {
            styleSheet = Object.assign(styleSheet, { color: this.mpatColor });
        }

        let cnt = value;
        let summary = <span style={styleSheet}>{key}</span>;
        if (typeof value === 'object') {
            try {
                let jsn = JSON.stringify(value, null, 3);
                if (jsn.toLocaleLowerCase().indexOf('mpat') > -1) {
                    styleSheet = Object.assign(Object.assign({}, style), { color: this.mpatColor });
                }
                cnt = <pre style={styleSheet}>{jsn}</pre>;
            } catch (err) {
                //    console.log(err);
            }
        }

        if (crudCallback) {
            let content = (<span><button className="button" title={`Delete option ${key} `} onClick={() => {
                if (this.noConfirm || confirm(`Are you sure you want to option "${key}" ? `)) {
                    crudCallback.remove(key, () => { this.loadOptions() }, this.loadOptions);
                }
            }}>X</button>{cnt}</span>);

            return this.ds(summary, content);
        }
        return this.ds(summary, cnt);
    }

    ds(summary, content) {
        return (<details><summary>{summary}</summary>{content}</details>);

    }
    render() {
        return (<div>
            {this.errorblock()}
            {this.getInfoPost('Pages', this.state.availablePages)}
            {this.getInfoPost('Layouts', this.state.availableLayouts)}
            {this.getInfoPost('Models', this.state.availableModels)}
            {this.getInfoOptions('Options', this.state.availableOptions)}
            {this.getInfoPlugins('Plugins', plugins)}
        </div>);
    }
}

ReactDOM.render(<RUI />, document.getElementById('rui'));
