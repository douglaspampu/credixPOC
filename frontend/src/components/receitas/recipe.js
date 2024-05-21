const Recipe = (props) => {
    console.log(props)
    return <div class="product">
        <h3>{props.recipe.name}</h3>
        <p>{props.recipe.description}</p>
        <img height="200px" width="200px" src={props.recipe.image_url} />
        <div>
            <h4>Ingredients</h4>
            {props.recipe.ingredients.map((i)=><li>{i}</li>)}
        </div>
    </div>
}

export default Recipe