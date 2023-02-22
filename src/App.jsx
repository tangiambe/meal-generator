import { useEffect } from "react";
import Skeleton from "./components/Skeleton";
import useAxios from "./hooks/useAxios";

function App() {
  const { getMeal, response, loading } = useAxios();
  const { strMeal, strMealThumb, strYoutube} = response;
  const youtubeUrl = strYoutube?.replace('watch?v=', 'embed/')
  console.log(response);

  useEffect(() => {
    getMeal();
  }, []);

  if(loading){
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Skeleton className='h-10 md:w-40' />
        <Skeleton className='h-10 w-72 mt-6' />
        <Skeleton className='h-10 w-72 mt-6' />
        <Skeleton className='h-64 mt-6' />
        <Skeleton className='h-72 mt-6' />
      </div>
    )
  }

  let ingredients = [];
  Object.keys(response).forEach((item, index) => {
    if(response[`strIngredient${index}`]){
      ingredients.push({
        "ingredient": response[`strIngredient${index}`],
        "measure": response[`strMeasure${index}`]
      })
    }
  });

const renderList = (item, index) => (
  <div className="flex text-sm">
    <li>{item.ingredient} - </li>
    <span className="italic text-gray-500"> {item.measure}</span>
  </div>
)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10" >
      <h1 className="text-5xl text-orange-600 underline text-center font-bold mt-6 font-serif">RandoMeal </h1>
      <br></br>
      
     <button
     onClick={() => getMeal()}
      className="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 border-b-4 border-red-700 hover:border-orange-300
      w-full rounded-full"
      >Get a New Meal!</button>  
      
      <h2
      className="text-4xl  mt-6 underline"
      >{strMeal}</h2>
      <div className="md:grid md:grid-cols-1 md:gap-2">
        <div className="mt-4 border-orange-500 border-4
        rounded-md h-80">
          <img className="w-full h-full object-cover" 
          src={strMealThumb} alt="image" />
        </div>
        <div className="my-6">
          <h3 className="text-4xl font-bold
          mb-2">Ingredients</h3>
          {ingredients.map((item, index) => 
          renderList(item,index))}
        </div>
      </div>

       <div className="aspect-w-16 aspect-h-9 mt-6">
          <iframe src={youtubeUrl}
          frameBorder="0" allow="accelerometer; auttoplay;
          clipboard-write; encrypted-media; gyroscope;
          picture-in-picture" allowFullScreen>
          </iframe>
        </div>
    </div>
  )
}

export default App
