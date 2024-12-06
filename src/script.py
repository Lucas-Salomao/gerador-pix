import os
import pathlib
from datetime import datetime

def consolidate_typescript_files():
    """
    Consolida todos os arquivos TypeScript (.ts) do diretório atual e suas subpastas
    em um único arquivo de texto na raiz.
    """
    # Obtém o diretório atual
    base_path = pathlib.Path.cwd()
    
    # Define o nome do arquivo de saída com timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = base_path / f'typescript_consolidado_{timestamp}.txt'
    
    # Contador de arquivos processados
    files_processed = 0
    
    print(f'Iniciando consolidação dos arquivos TypeScript em: {base_path}')
    
    # Abre o arquivo de saída em modo de escrita
    with open(output_file, 'w', encoding='utf-8') as output:
        # Adiciona cabeçalho com informações
        output.write(f'// Arquivos TypeScript consolidados em {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n')
        output.write(f'// Diretório base: {base_path}\n\n')
        
        # Itera sobre todos os arquivos no diretório e subdiretórios
        for typescript_file in base_path.rglob('*.ts'):
            # Ignora a pasta node_modules
            if 'node_modules' in str(typescript_file):
                continue
                
            # Escreve o nome do arquivo como comentário
            relative_path = typescript_file.relative_to(base_path)
            output.write(f'// Arquivo: {relative_path}\n')
            
            # Lê e escreve o conteúdo do arquivo
            try:
                with open(typescript_file, 'r', encoding='utf-8') as input_file:
                    content = input_file.read()
                    output.write(content)
                    output.write('\n\n')
                files_processed += 1
            except Exception as e:
                print(f'Erro ao processar o arquivo {typescript_file}: {str(e)}')
    
    print(f'Consolidação concluída!')
    print(f'Arquivos processados: {files_processed}')
    print(f'Arquivo de saída: {output_file}')

if __name__ == '__main__':
    try:
        consolidate_typescript_files()
    except Exception as e:
        print(f'Erro durante a consolidação: {str(e)}')