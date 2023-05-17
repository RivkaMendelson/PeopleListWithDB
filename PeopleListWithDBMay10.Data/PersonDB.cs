using ReactWithBackend.Data;

namespace PeopleListWithDBMay10.Data
{
    public class PersonDB
    {
        private string _connectionString;

        public PersonDB(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(Person person)
        {
            using var context = new PersonDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public List<Person> GetAllPeople()
        {
            using var context = new PersonDbContext(_connectionString);
            return context.People.ToList();
        }

        public void Update(Person person)
        {
            using var context = new PersonDbContext(_connectionString);
            context.People.Update(person);
        }

        public void Delete(Person person)
        {
            using var context = new PersonDbContext(_connectionString);
            context.People.Remove(person);
        }



    }
}