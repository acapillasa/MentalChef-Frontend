import React, { useState, useEffect } from "react";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [userRanking, setUserRanking] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch("usuarios/rankingDiarioList");
        if (!response.ok) {
          throw new Error("Error al obtener el ranking diario");
        }
        const data = await response.json();

        // Group by user ID and count correct answers
        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.usuarioId]) {
            acc[item.usuarioId] = { ...item, correctCount: 0, username: item.username };
          }
          if (item.acertado) {
            acc[item.usuarioId].correctCount += 1;
          }
          return acc;
        }, {});

        // Convert to array and sort by correctCount
        const sortedData = Object.values(groupedData).sort((a, b) => b.correctCount - a.correctCount);

        setRanking(sortedData);
        console.log("Ranking diario:", sortedData);
      } catch (error) {
        console.error("Error al obtener el ranking diario:", error);
      }
    };

    fetchRanking();
  }, []);

  useEffect(() => {
    const fetchUserRanking = async () => {
      try {
        const response = await fetch("usuarios/miRankingDiario");
        if (!response.ok) {
          throw new Error("Error al obtener el ranking del usuario");
        }
        const data = await response.json();

        // Group by user ID and count correct answers
        const userCorrectCount = data.reduce((acc, item) => {
          if (item.acertado) {
            acc += 1;
          }
          return acc;
        }, 0);

        // Find the user's position in the overall ranking
        const userPosition = ranking.findIndex(item => item.usuarioId === data[0].usuarioId) + 1;

        setUserRanking({
          usuarioNombre: data[0].usuarioNombre,
          correctCount: userCorrectCount,
          posicion: userPosition
        });

        console.log("Ranking del usuario:", {
          usuarioNombre: data[0].usuarioNombre,
          correctCount: userCorrectCount,
          posicion: userPosition
        });
      } catch (error) {
        console.error("Error al obtener el ranking del usuario:", error);
      }
    };

    if (ranking.length > 0) {
      fetchUserRanking();
    }
  }, [ranking]);

  const topThree = ranking.slice(0, 3);

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-black">Ranking Mensual</h1>
      <div className="flex justify-center items-end mb-8">
        {topThree.length > 0 && (
          <>
            {topThree[0] && (
              <div className="flex flex-col items-center bg-yellow-300 p-4 m-2 mb-20 rounded-lg" style={{ order: 1 }}>
                <span className="font-bold text-black">Usuario: {topThree[0].usuarioNombre}</span>
                <span className="text-black">Aciertos: {topThree[0].correctCount}</span>
              </div>
            )}
            {topThree[1] && (
              <div className="flex flex-col items-center bg-gray-300 p-4 m-2 mb-6 rounded-lg" style={{ order: 0 }}>
                <span className="font-bold text-black">Usuario: {topThree[1].usuarioNombre}</span>
                <span className="text-black">Aciertos: {topThree[1].correctCount}</span>
              </div>
            )}
            {topThree[2] && (
              <div className="flex flex-col items-center bg-yellow-600 p-4 pt-4 m-2 rounded-lg" style={{ order: 2 }}>
                <span className="font-bold text-black">Usuario: {topThree[2].usuarioNombre}</span>
                <span className="text-black">Aciertos: {topThree[2].correctCount}</span>
              </div>
            )}
          </>

        )}
      </div>
      {userRanking && (
        <div className="mt-4 p-4 bg-blue-200 rounded-lg mx-auto text-center" style={{ maxWidth: '400px' }}>
          <h2 className="text-xl font-bold text-black">Tu posición</h2>
          <p className="text-black">Usuario: {userRanking.usuarioNombre}</p>
          <p className="text-black">Posición: {userRanking.posicion}</p>
          <p className="text-black">Aciertos: {userRanking.correctCount}</p>
        </div>
      )}
    </div>
  );
};

export default Ranking;
