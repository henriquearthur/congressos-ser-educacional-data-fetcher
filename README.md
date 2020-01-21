# Congressos Ser Educacional - Data Fetcher
Extrator de dados de [https://eventos.sereduc.com](eventos.sereduc.com). Extrai e processa dados de cada evento como informações gerais e palestras.

## Baixar palestras
```
node lectures.js
```

## Fazer backup
```
node backup.js
```

## Restaurar backup
Para listar os backups disponíveis: `ls backups`

Para restaurar um backup:

```
node restore.js --backup="nome_arquivo.json"
```
