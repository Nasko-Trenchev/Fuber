import { Stack, Rating, Button, FormControl, FormLabel } from "@mui/material";
import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { getDoc, doc, updateDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { db, auth } from "../../config/firebase";
import { Textarea } from "@mui/joy";
import { UserAuth } from "../../contexts/UserContext";

import styles from './Comments.module.css';

export type Comment = {
    stars: number,
    verified: boolean,
    date: Timestamp,
    text: string,
    user: string
}

export interface Comments {
    comments: Comment[],
}

export default function Comments() {

    const [commentsData, setCommentsData] = useState<Comments | null>(null)
    const [showCommentInput, setShowCommentInput] = useState(true);
    const [typedComment, setTypedComment] = useState<string>('')
    const [rating, setRating] = useState<number | null>(0);

    const { restaurantId, restaurantName } = useParams();
    const { isAuthenticated } = UserAuth();

    const currentRestaurantRef = doc(db, "Restaurants", restaurantId!);
    const currentRestaurantCommentsRef = doc(db, "Restaurants", restaurantId!, "Comments", restaurantName!);

    const getComments = useCallback(async () => {
        const docSnap = await getDoc(currentRestaurantCommentsRef);
        setCommentsData(docSnap.data() as Comments);
    }, [])

    useEffect(() => {
        getComments();
    }, [getComments])

    const lastComment = commentsData?.comments.slice(-1);
    
    const createComment = async () => {
        await updateDoc(currentRestaurantCommentsRef, {
            comments: arrayUnion({
                stars: rating,
                verified: true,
                date: Timestamp.now(),
                text: typedComment,
                user: auth?.currentUser?.email
            })
        })

        await updateDoc(currentRestaurantRef, {
            voterEmails: arrayUnion(auth.currentUser?.email),
            totalRating: arrayUnion({ email: auth.currentUser?.email, rating: rating })
        })

        getComments();
    }

    // const updateCommentRating = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
    //     setRating(newValue)
    // }


    // const rateRestaurant = async (_event: React.ChangeEvent<{}>, newValue: number | null) => {

    //     await updateDoc(currentRestaurantRef, {
    //         stars: newValue,
    //         voterEmails: arrayUnion(auth.currentUser?.email),
    //         totalRating: arrayUnion(newValue)
    //     })

    //     setRating(newValue)
    // }
    return (
        <div className={styles['commentContainer']}>
            <h1>Comments</h1>
            {lastComment?.map((x) => (
                <>
                    <Stack key={x.text} className={styles['comments']}>
                        <Stack className={styles['commentsUser']}>
                            <p>{x.user}</p>
                            <Rating
                                precision={0.5}
                                size='medium'
                                value={x.stars}
                                disabled
                            />
                            <p>{x.date.toDate().toDateString()}</p>
                        </Stack>
                        <Stack className={styles['commentsUser']}>
                            <p>{x.text}</p>
                        </Stack>
                    </Stack>
                    <hr />
                </>
            ))}
            {/* <Button onClick={() => setShowCommentInput(!showCommentInput)}>Add comment</Button> */}
            {commentsData?.comments?.some(x => x.user === auth?.currentUser?.email) ?
                <p>You`ve already commented this</p> : (isAuthenticated ?
                    <FormControl sx={{ display: 'block' }}>
                        <FormLabel>
                            <div>
                                Your restaurant rating:
                                <Rating
                                    onChange={(event, value) => setRating(value)}
                                />
                            </div>
                        </FormLabel>
                        <Textarea
                            placeholder="You may leave your comment here..."
                            maxRows={4}
                            onChange={(e) => setTypedComment(e.target.value)}
                            endDecorator={
                                <Button type="submit"
                                    sx={{ ml: 'auto' }}
                                    onClick={createComment}
                                >
                                    Send
                                </Button>
                            }
                        />
                    </FormControl>
                    : <p>Only logged in users may comment and rate the restaurant</p>
                )}
        </div>
    )
}

