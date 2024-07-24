import { NextPage, GetServerSideProps } from 'next';
import RecipeCard from '../components/RecipeCard';
import stack from '../components/lib/contentstack'; // Import the stack configuration

interface Recipe {
  sys: {
    id: string;
  };
}

interface RecipesProps {
  recipes: Recipe[];
}

export const getServerSideProps: GetServerSideProps<RecipesProps> = async () => {
  try {
    const query = stack.ContentType('recipes').Query();
    const response = await query.toJSON().find();

    return {
      props: {
        recipes: response[0] || [],
      },
    };
  } catch (error) {
    console.error('Error fetching entries:', error);

    return {
      props: {
        recipes: [],
      },
    };
  }
};

const Recipes: NextPage<RecipesProps> = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.uid} recipe={recipe} />
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          text-align: center;
        }
        @media (max-width: 930px) {
          .recipe-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Recipes;
