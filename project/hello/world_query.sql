-- Table: Island ------------------------
SELECT island.name, SUM( hotel.capacity )
  FROM island, hotel
  WHERE 
    hotel.island_id = island.island_id
  GROUP BY
    island.name;

-- Table: Hotel ------------------------
SELECT i.name AS island, h.name AS hotel, h.capacity
  FROM
    island i,
    hotel h
  WHERE
    h.island_id = i.island_id
    AND h.capacity > 100;

