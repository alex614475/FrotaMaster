using FrotaMaster.Infrastructure;
using FrotaMaster.Application;
using Microsoft.OpenApi.Models;

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

// Swagger no modo dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
app.UseCors("AllowAngular");

// 👉 Necessário para servir o FRONTEND Angular
app.UseDefaultFiles();
app.UseStaticFiles();

// Rotas da API
app.MapControllers();

// Test
app.MapGet("/ping", () => "FrotaMaster API rodando!");

// 👉 Fallback para SPA Angular (ESSENCIAL)
app.MapFallbackToFile("index.html");

app.Run();
