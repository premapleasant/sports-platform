function MatchCard({ match, onFavorite, isFavorite }) {
  return (
    <div className="match-card">
      <h3>{match.teams}</h3>
      <p>Sport: {match.sport}</p>
      <p>League: {match.league}</p>
      <p>Start Time: {match.startTime}</p>

      <button onClick={() => onFavorite(match.id)}>
        {isFavorite ? "★ Remove Favorite" : "☆ Add Favorite"}
      </button>
    </div>
  );
}

export default MatchCard;
