import { useEffect, useState } from "react";
import API from "../services/api";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";


function Favorites() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const res = await API.get("/favorites");
    setMatches(res.data);
  };


  if (matches.length === 0) return <p>No favorites yet</p>;

 return (
  <>
    <Navbar />

<div className="page-container">
  <h2>My Favorites</h2>

  {matches.length === 0 ? (
    <p className="center-text">No favorites yet</p>
  ) : (
    matches.map((match) => (
      <MatchCard
        key={match.id}
        match={match}
        isFavorite={true}
        onFavorite={() => {}}
      />
    ))
  )}
</div>

  </>
);

}

export default Favorites;
