import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
    query getMovie($id: Int!){
        movie(id: $id){
            id
            title
            medium_cover_image
            description_intro
            language
            rating
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size:60px;
    margin-bottom: 10px;
`;
const Subtitle = styled.h4`
    font-size:46px;
    margin-bottom: 5px;
`;

const Description = styled.p`
    font-size: 20px;
`;

const Poster = styled.div`
    width: 30%;
    height: 60%;
    bargroundlcolor: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;

`;


export default () => {
    let { id } = useParams();
    id = parseInt(id);
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id }
    });
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : data.movie.title}</Title>
                {!loading && data.movie && <> {""}
                    <Subtitle>{data.movie.language} / {data.movie.rating}</Subtitle>
                    <Description>{data.movie.description_intro}</Description></>}

            </Column>
            {!loading && <Poster bg={data.movie ? data.movie.medium_cover_image : ""}></Poster>}
        </Container>
    );
};