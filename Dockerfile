# Use a imagem oficial do SonarQube como base
FROM sonarqube:latest

# Copie o arquivo de configuração customizado para dentro do container
# (Se você tiver alterações específicas no sonar.properties, coloque o arquivo modificado aqui)
COPY sonar.properties /opt/sonarqube/conf/sonar.properties

# Adicione qualquer outro arquivo ou plugin que você deseja instalar
# Exemplo de cópia do plugin para o diretório de plugins
COPY sonarqube-community-branch-plugin-1.21.0.jar /opt/sonarqube/extensions/plugins/

# Alterar permissões dos arquivos e diretórios, se necessário
# Note que isso pode não funcionar dependendo das permissões e do sistema de arquivos do Docker
# RUN chown -R sonarqube:sonarqube /opt/sonarqube/conf /opt/sonarqube/extensions/plugins \
#     && chmod 644 /opt/sonarqube/conf/sonar.properties \
#     && chmod 755 /opt/sonarqube/extensions/plugins

# A configuração do SonarQube pode exigir a definição de variáveis de ambiente ou opções adicionais
# ENV SONARQUBE_OPTION=value
ENV SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true

# Exponha a porta usada pelo SonarQube
EXPOSE 9000

