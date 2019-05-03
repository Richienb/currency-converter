import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {createGlobalStyle, ServerStyleSheet} from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		background-color: #212121;
		font-family: monospace;
		margin: auto;
		font-size: 16px;
		width: 80%;
		padding-top: 50px;
		padding-bottom: 100px;
		color: #fff;
		-webkit-font-smoothing: antialiased;
		-webkit-touch-callout: none;
		text-rendering: optimizeSpeed;
	}
`;

export default class MyDocument extends Document {
	static getInitialProps({renderPage}) {
		const sheet = new ServerStyleSheet();

		const page = renderPage(Component => props => sheet.collectStyles(<Component {...props}/>));

		const styleElements = sheet.getStyleElement();
		return {...page, styleElements};
	}

	render() {
		const {styleElements} = this.props;

		return (
			<html lang="en">
				<Head>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					<meta name="description" content="Simple currency converter, that works offline!"/>
					<meta name="theme-color" content="#212121"/>
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
					<link rel="manifest" href="static/manifest.json"/>
					<link rel="icon" href="static/favicon.png"/>
					<link rel="apple-touch-icon" href="static/apple-touch-icon.png"/>
					<link rel="apple-touch-startup-image" href="static/splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image" href="static/splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image" href="static/splashscreens/iphoneplus_splash.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image" href="static/splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image" href="static/splashscreens/ipad_splash.png" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image" href="static/splashscreens/ipadpro1_splash.png" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image" href="static/splashscreens/ipadpro2_splash.png" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/>
					{styleElements}
				</Head>
				<body>
					<Main/>
					<NextScript/>
					<GlobalStyle/>
				</body>
			</html>
		);
	}
}
