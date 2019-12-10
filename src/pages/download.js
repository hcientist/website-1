import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import fetch from 'node-fetch'

class DownloadPage extends Component {
    state = {
        release: '',
        mac: '',
        win: '',
        linuxAppImage: '',
        linuxDeb: '',
        os: '',
    }

    componentDidMount() {
        // const version = await this.getLatestRelease();
        const version = '5.4.0';
        const os = this.getOS();

        this.setState({
            release: version,
            mac: `https://github.com/getferdi/ferdi/releases/download/v${version}/Ferdi-${version}.dmg`,
            win: `https://github.com/getferdi/ferdi/releases/download/v${version}/Ferdi-Setup-${version}.exe`,
            linuxAppImage: `https://github.com/getferdi/ferdi/releases/download/v${version}/Ferdi-${version}.AppImage`,
            linuxDeb: `https://github.com/getferdi/ferdi/releases/download/v${version}/ferdi_${version}_amd64.deb`,
            os,
        });
    }

    getLatestRelease() {
        return new Promise(resolve => {
            fetch('https://api.github.com/repos/getferdi/ferdi/releases/latest')
            .then(data => data.json())
            .then(data => resolve(data.name))
        })
    }

    getOS() {
        const platform = window.navigator.platform;
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        let os;
      
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'mac';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'win';
        } else if (!os && /Linux/.test(platform)) {
          os = 'linux';
        }
      
        return os;
    }

    fullOSName(os) {
        switch(os) {
            case 'mac':
                return 'Mac';
            case 'win':
                return 'Windows';
            case 'linux':
                return 'Linux';
            default:
                return '';
        }
    }

    render() {
        const {
            release,
            mac,
            win,
            linuxAppImage,
            linuxDeb,
            os,
        } = this.state;

        return (
            <Layout>
                <SEO title="Download"/>
                <div className={"container"}>
                    <div className={"content"}>
                        <div className={"title"}>
                            <h1>Download Ferdi {release}</h1>
                        </div>

                        { os && (
                            <div className={"center"}>
                                <div className={"download-button"}>
                                    { os !== 'linux' ? (
                                        <a href={this.state[os]}>Download for { this.fullOSName(os) }</a>
                                    ) : (
                                        <>
                                            <a href={linuxAppImage}>Download AppImage for { this.fullOSName(os) }</a>
                                            <a href={linuxDeb}>Download for Ubuntu (.deb)</a>
                                        </>
                                    )}
                                    
                                </div>
                            </div>
                        ) }

                        {os && <h2 className={"download-all"}>All platforms</h2>}

                        <div className={"row"}>
                            <div className={"col-6"}>
                                <div className={"download-button"}>
                                    <a href={win}>Download for Windows</a>
                                </div>
                            </div>
                            <div className={"col-6"}>
                                <div className={"download-button"}>
                                    <a href={mac}>Download for Mac</a>
                                </div>
                            </div>
                        </div>

                        <div className={"row"}>
                            <div className={"col-6"}>
                                <div className={"download-button"}>
                                    <a href={linuxAppImage}>Download Linux AppImage</a>
                                </div>
                            </div>
                            <div className={"col-6"}>
                                <div className={"download-button"}>
                                    <a href={linuxDeb}>Download for Ubuntu (.deb)</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Layout>
        );
    }
}

export default DownloadPage
