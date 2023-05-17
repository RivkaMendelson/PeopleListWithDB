using Microsoft.EntityFrameworkCore;
using PeopleListWithDBMay10.Data;

namespace ReactWithBackend.Data
{
    public class PersonDbContext : DbContext
    {
        private string _connectionString;

        public PersonDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Person> People { get; set; }
    }
}