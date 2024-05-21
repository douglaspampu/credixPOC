import { Link } from "react-router-dom"; 

const Home = () => {

    return <div class="page_content">
        <h2>Sandbox market</h2>

        <div class="menu">
            <Link to='/catalog' class="buttom">See our catalog</Link>
            <Link to='/recipes' class="buttom">See our recipes suggestions</Link>
        </div>
    </div>
}

export default Home