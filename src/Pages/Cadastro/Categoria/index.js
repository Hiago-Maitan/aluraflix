import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField/index';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }

    const { handleChange, values, clearForm } = useForm(valoresIniciais);

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const URL_TOP = window.location.hostname.includes('localhost')
            ? 'http://localhost:8080/categorias'
            : 'https://animee-flix.herokuapp.com/categorias';
        fetch(URL_TOP)
            .then(async (respostaDoServidor) => {
                const resposta = await respostaDoServidor.json();
                setCategorias([
                    ...resposta,
                ]);
            });


        setTimeout(() => {

        });
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                clearForm();
            }}>


                <FormField
                    label="Nome da categoria"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                />

                <FormField
                    label="Descrição"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                />

                <FormField
                    label="Cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}
                />

                <Button>
                    Cadastrar
                </Button>
            </form>

            {categorias.length === 0 && (
                <div>
                    {/* Carregando */}
                    Loading...
                </div>
            )}

            <ul>
                {categorias.map((categorias) => {
                    return (
                        <li key={`${categorias.titulo}`}>
                            {categorias.titulo}
                        </li>
                    )
                })}
            </ul>

            <Link to="/">
                Ir para Home
            </Link>
        </PageDefault>
    );
}
export default CadastroCategoria;