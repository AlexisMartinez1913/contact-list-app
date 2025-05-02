import { Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import { USERS } from '../dummy/dummy';

import UserCard from './UserCard';
import { useEffect, useState } from 'react';

const UserGrid = ({ users, setUsers }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch("http://127.0.0.1:5000/api/friends");
                const data = res.json();

                if (!res.ok) {
                    throw new Error(data.error);
                }
                setUsers[data];

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getUsers();

    }, [setUsers])
    return (

        <>
            <Grid templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
            }}
                gap={3}
            >
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </Grid>

            {isLoading && (
                <Flex justifyContent={"center"}>
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {!isLoading && users.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text fontSize={"xl"}>
                        <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                            Poor you! 🥺
                        </Text>
                    </Text>
                    No Contacts Found!
                </Flex>
            )}

        </>
    )
}

export default UserGrid