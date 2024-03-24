CREATE TABLE PessoaFisica (
    ID INT PRIMARY KEY,
    FichaCadastralID INT,
    NomeCompleto VARCHAR(200) NOT NULL,
    CPF VARCHAR(30) NOT NULL,
    RG VARCHAR(30) NOT NULL,
    DataNascimento DATE NOT NULL,
    EstadoCivil VARCHAR(20),
    FOREIGN KEY (FichaCadastralID) REFERENCES FichaCadastral(ID)
);

INSERT INTO PessoaFisica (ID, FichaCadastralID, NomeCompleto, CPF, RG, DataNascimento, EstadoCivil)
VALUES 
(1, 1, 'João Silva', '123.456.789-00', 'MG-12.345.678', '1980-01-01', 'Casado'),
(2, 2, 'Maria Santos', '987.654.321-00', 'SP-87.654.321', '1985-02-02', 'Solteira');
