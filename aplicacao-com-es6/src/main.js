import api from './api';

class App {
    constructor(){
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');
        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(Loading = true){
        if (Loading === true){
            let LoadingEl = document.createElement('span');
            LoadingEl.appendChild(document.createTextNode('Carregando'));
            LoadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(LoadingEl);
        }
        else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length === 0)
            return;

        this.setLoading();

        try{
            const response = await api.get(`/users/${repoInput}`);

            console.log(response);

            const { name, bio, html_url, avatar_url } = response.data;


            this.repositories.push({
                name,
                bio, 
                avatar_url, 
                html_url,
            });

            this.render();
        }
        catch(err){
            alert('O usuario não existe');
        }

        this.inputEl.value = '';

        this.setLoading(false);
    }

    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.bio));
            
            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listitemEl = document.createElement('li');
            listitemEl.appendChild(imgEl);
            listitemEl.appendChild(titleEl);
            listitemEl.appendChild(descriptionEl);
            listitemEl.appendChild(linkEl);

            this.listEl.appendChild(listitemEl);
        });
    }
}

new App();