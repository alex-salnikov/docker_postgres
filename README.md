# Running Postgres + pgAdmin with Docker-Compose
Containers
- https://hub.docker.com/_/postgres
- https://hub.docker.com/r/dpage/pgadmin4/

References
- [How to Run PostgreSQL and pgAdmin Using Docker](https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5)
- [Adding postgress connections to pgadmin in docker file](https://stackoverflow.com/questions/64620446/adding-postgress-connections-to-pgadmin-in-docker-file)
- [pgAdmin 4 6.3 documentation / Getting Started / Deployment / Container Deployment](https://www.pgadmin.org/docs/pgadmin4/development/container_deployment.html)

# pgpass
Format
```
hostname:port:database:username:password
```

References
- [Where is the pgpass file in pgadmin4 docker container when this file is mounted as a volume](https://stackoverflow.com/questions/66578506/where-is-the-pgpass-file-in-pgadmin4-docker-container-when-this-file-is-mounted/)

docker-compose.yml
```yaml
services:
  pgadmin:
    image: dpage/pgadmin4
    entrypoint: >
      /bin/sh -c "
      cp -f /pgadmin4/pgpass /var/lib/pgadmin/;
      chmod 600 /var/lib/pgadmin/pgpass;
      chown pgadmin:pgadmin /var/lib/pgadmin/pgpass;
      /entrypoint.sh
      "
    volumes:
      - ./config/pgpass:/pgadmin4/pgpass
```

config/servers.json
```json
"PassFile": "/var/lib/pgadmin/pgpass",
```

Verify access-mode (600) and contents of `/var/lib/pgadmin/pgpass` in container
```
$ docker exec -it 354e7e46 /bin/sh
$ ls -la /var/lib/pgadmin/pgpass
$ cat /var/lib/pgadmin/pgpass
```

Examples:
```
hostname:port:database:username:password
dockerserver.lan:5432:postgres:root:root
*:*:*:username:password
```

## Error
```
2022-01-23 14:54:05,058: ERROR	pgadmin:	Could not connect to server(#1) - 'docker_postgres'.
Error: connection to server at "dockerserver.lan" (192.168.1.x), port 5432 failed: fe_sendauth: no password supplied
```

# Backup
docker-copy saved backup-file from container
```bash
docker cp 354e7e46:/var/lib/pgadmin/storage/admin_admin.com/backup-file.sql ./backup-file.sql
```
