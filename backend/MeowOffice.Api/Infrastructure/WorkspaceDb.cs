using MeowOffice.Api.Domain;
using Microsoft.EntityFrameworkCore;
namespace MeowOffice.Api.Infrastructure;
public sealed class WorkspaceDb(DbContextOptions<WorkspaceDb> options) : DbContext(options)
{
    public DbSet<TaskRecord> Tasks => Set<TaskRecord>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<TaskRecord>().HasKey(x => x.Id);
        b.Entity<TaskRecord>().Property(x => x.Title).HasMaxLength(4000);
    }
}
