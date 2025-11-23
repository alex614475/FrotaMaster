using FrotaMaster.Infrastructure;
using FrotaMaster.Application;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FrotaMaster API",
        Version = "v1",
        Description = "API para gerenciamento de frota"
    });
});

// Application
builder.Services.AddApplication();

// Infrastructure
builder.Services.AddInfrastructure(builder.Configuration);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();


// 🚀 **AUTO-MIGRATE NO RAILWAY**
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<FrotaMaster.Infrastructure.Persistence.FrotaMasterDbContext>();
        db.Database.Migrate();
        Console.WriteLine("✅ Migrações executadas com sucesso!");
    }
    catch (Exception ex)
    {
        Console.WriteLine("❌ Erro ao aplicar migrations:");
        Console.WriteLine(ex.Message);
    }
}


// Swagger dev only
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
app.UseCors("AllowAngular");

// 👉 Frontend Angular
app.UseDefaultFiles();
app.UseStaticFiles();

// API Controllers
app.MapControllers();

// Test route
app.MapGet("/ping", () => "FrotaMaster API rodando!");

// 👉 SPA fallback
app.MapFallbackToFile("index.html");

app.Run();
