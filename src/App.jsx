import { useState, useRef } from 'react'
import './App.css'
import Solution from './Components/Solution/Solution'
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Tab from './Components/Header/Tab';

function App() {
	const [ currTab, setTab] = useState('Q2');

	const changeTab = (tab) => {
		setTab(tab);
	}

	const scrollRef = useRef(null);

    const executeScroll = () => {
		scrollRef.current.scrollIntoView({ behavior: 'smooth' });
		console.log("scroll");
	}

	return (
		<div className="App">
			<Header currTab={ currTab } changeTab={ changeTab } scrollRef={ scrollRef } />
			<Solution ques={ currTab } />
			<Tab currTab={ currTab } changeTab={ changeTab } executeScroll={ executeScroll } isBottom={ true } />
			<Footer />
		</div>
	)
}

export default App
