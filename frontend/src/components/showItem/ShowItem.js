import './showItem.css';

const ShowItem = ({item}) => {
  return (
    <div className='showItem'>
      <h1>{item.name}</h1>
      <div dangerouslySetInnerHTML={{__html: item.summary}}></div>
    </div>
  );
};

export default ShowItem;
