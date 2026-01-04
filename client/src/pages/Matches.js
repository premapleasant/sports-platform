import { useEffect, useState } from "react";
import API from "../services/api";
import MatchCard from "../components/MatchCard";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMatches();
    fetchFavorites();
  }, [filter]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/games${filter ? `?sport=${filter}` : ""}`);
      setMatches(res.data);
    } catch {
      setError("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    const res = await API.get("/favorites");
    setFavorites(res.data.map((f) => f.gameId));
  };

  const toggleFavorite = async (id) => {
    if (favorites.includes(id)) {
      await API.delete(`/favorites/${id}`);
      setFavorites(favorites.filter((f) => f !== id));
    } else {
      await API.post(`/favorites/${id}`);
      setFavorites([...favorites, id]);
    }
  };

  if (loading) return <p className="center-text">Loading matches...</p>;
  if (error) return <p className="center-text">{error}</p>;
  if (matches.length === 0) return <p>No matches found</p>;

return (
  <>
   <Navbar />

<div className="page-container">
  <h2>Sports Matches</h2>
  <FilterBar value={filter} onChange={setFilter} />

  {matches.map((match) => (
    <MatchCard
      key={match.id}
      match={match}
      isFavorite={favorites.includes(match.id)}
      onFavorite={toggleFavorite}
    />
  ))}
</div>
  </>
);
}

export default Matches;
