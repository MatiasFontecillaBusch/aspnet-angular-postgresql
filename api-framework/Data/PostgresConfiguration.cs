using Npgsql;
using System.Data.Entity;

namespace api_framework.Data
{
    public class PostgresConfiguration : DbConfiguration
    {
        public PostgresConfiguration()
        {
            SetProviderServices("Npgsql", NpgsqlServices.Instance);
            SetProviderFactory("Npgsql", NpgsqlFactory.Instance);
        }
    }
}