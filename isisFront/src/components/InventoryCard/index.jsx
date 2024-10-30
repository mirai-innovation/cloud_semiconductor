import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { fetchInventoryData } from '../../services/Api';
import './index.css';

const InventoryCard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInventoryData = async () => {
      try {
        const data = await fetchInventoryData();
        setInventoryData(data);
      } catch (error) {
        console.error('Error al cargar datos de inventario:', error);
      } finally {
        setLoading(false);
      }
    };

    getInventoryData();
  }, []);

  if (loading) {
    return <p>Cargando inventario...</p>;
  }

  return (
    <div className="inventory-container">
      {inventoryData.map((item) => (
        <Card key={item._id} title={`Circuito: ${item.name}`} className="inventory-card">
          <p>Cantidad Total: {item.totalQuantity}</p>
          <p>Buenos: {item.goodQuantity}</p>
          <p>Defectuosos: {item.defectiveQuantity}</p>
          <p>Última Actualización: {new Date(item.lastUpdated).toLocaleString()}</p>
        </Card>
      ))}
    </div>
  );
};

export default InventoryCard;
