using FrotaMaster.Infrastructure;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FrotaMaster API",
        Version = "v1",
        Description = "API para gerenciamento de frota de veículos"
    });
});

// Infrastructure (DbContext, repositórios, etc.)
builder.Services.AddInfrastructure(builder.Configuration);

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FrotaMaster API v1");
    });
}

// Removemos o UseHttpsRedirection para evitar o aviso e porque estamos usando HTTP
// app.UseHttpsRedirection();

// Usar CORS
app.UseCors("AllowAngular");

app.MapControllers();

// Exemplo de endpoint simples (opcional)
app.MapGet("/ping", () => "FrotaMaster API rodando!");

app.Run();