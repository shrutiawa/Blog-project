import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Skeleton from '../../components/Skeleton';
import stack from '../../components/lib/contentstack'; 
import { NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (!params || typeof params.url !== 'string') {
      return {
        notFound: true,
      };
    }

    const query = stack.ContentType('recipes').Query().where('url', params.url);
    const res = await query.toJSON().find();

    const recipe = res[0][0];
    recipe.title = recipe.title || null;
    recipe.cooking_time = recipe.cooking_time || null;
    recipe.ingredients = recipe.ingredients || [];
    recipe.method = recipe.method || null;

    return {
      props: { recipe },
    };
  } catch (error) {
    console.error('Error fetching static props:', error);
    return {
      props: {},
    };
  }
};



interface RecipeDetailsProps {
  recipe?: {
    title?: string;
    cooking_time?: string;
    ingredients?: string[];
    method?: string;
    featured_image?: {
      url: string;
    };
  };
}

const RecipeDetails: NextPage<RecipeDetailsProps> = ({ recipe }) => {
  if (!recipe) return <Skeleton />;

  const { title, cooking_time, ingredients, method, featured_image } = recipe;

  return (
    <div>
      <div className="banner">
        {featured_image && (
          <Image
            src={featured_image.url}
            width={1150}
            height={250}
            alt="banner"
            draggable="false"
          />
        )}
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Takes about {cooking_time} mins to cook.</p>
        <h3>Ingredients for how to make dish:</h3>
        <p>{ingredients}</p>
      </div>
      <div className="method">
        <h3>Method:</h3>
        <p>{method}</p>
      </div>

      <style jsx>{`
        h2, h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info p {
          margin: 0;
        }
        @media (max-width: 700px) {
          h2 {
            font-size: 1rem;
          }
        }
        .info span::after {
          content: ', ';
        }
        .info span:last-child::after {
          content: '.';
        }
      `}</style>
    </div>
  );
};

export default RecipeDetails;

