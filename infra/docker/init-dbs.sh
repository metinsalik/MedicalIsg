#!/bin/bash
set -e

# Platform veritabanına ek olarak şablon veritabanını (template_db) ve örnek tenant DB'sini oluştur
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE isg_tenant_template;
    CREATE DATABASE isg_tenant_demo;
    GRANT ALL PRIVILEGES ON DATABASE isg_tenant_template TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE isg_tenant_demo TO $POSTGRES_USER;
EOSQL

echo ">>> Medical ISG Platform and Tenant Template databases successfully created."
