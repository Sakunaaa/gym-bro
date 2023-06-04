import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';

import '@vercel/examples-ui/globals.css';

type LayoutProps = {
	children: ReactNode;
};

const Layout = (props: LayoutProps) => {
	return (
		<div>
			<nav className="w-full max-w-3xl mx-auto py-6">
				<span>GymBro</span>
			</nav>
			{props.children}
		</div>
	);
};

function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
			<Analytics />
		</Layout>
	);
}

export default App;
