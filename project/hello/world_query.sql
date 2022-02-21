-- Table: Island ------------------------

-- Query: for each island get its name and total capacity of its hotels
SELECT island.name, SUM( hotel.capacity )
  FROM island, hotel
  WHERE 
    hotel.island_id = island.island_id
  GROUP BY
    island.name;


-- Table: Hotel ------------------------

-- Query: for each hotel with capacity > 100 get island name, hotel name and its capacity
SELECT i.name AS island, h.name AS hotel, h.capacity
  FROM
    island i,
    hotel h
  WHERE
    h.island_id = i.island_id
    AND h.capacity > 100;

