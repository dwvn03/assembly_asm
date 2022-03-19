import './Tab.css';

const Tab = ({ currTab, changeTab, executeScroll = null, isBottom = false }) => (
    <div className="tab">
        { Array.from({length: 7}, (_, i) => `Q${++i}`).map((item, id) => (
            <button 
                key={ id }
                className={ "tablinks " + (currTab == item ? 'active' : '') }
                onClick={ () => {
                    changeTab(item); 
                    if (isBottom) executeScroll(); 
                }}
            >
                { item }
            </button>
        )) }
    </div>
)


export default Tab