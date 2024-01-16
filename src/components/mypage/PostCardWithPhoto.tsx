import { PostCardBox, PostCardBoxWrapper } from './PostCardStyle';
import { MypagePostCardPropType } from './type';
import PostModal from './PostModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mypageLikePostApi } from '../../api/mypage/userpost';
import DOMPurify from 'dompurify';

const PostCardWithPhoto = (props: MypagePostCardPropType) => {
    const navigate = useNavigate();
    const [heart, setHeart] = useState(true);
    const location = useLocation().pathname;
    const heartControl = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        mypageLikePostApi(props.id);
        setHeart(!heart);
    };
    return (
        <PostCardBoxWrapper
            className="photo"
            phototitle="true"
            onClick={() => navigate(`/community/${props.id}`)}
        >
            <PostCardBox
                className="photo"
                style={{
                    backgroundImage: `url(${props.thumbnail})`,
                }}
            ></PostCardBox>
            <PostCardBox className="date">
                <div>{props.createdDate}</div>
                {props.type === '게시글' &&
                props.isAuthor === true &&
                location.includes('mypage') ? (
                    <PostModal id={props.id} />
                ) : null}
            </PostCardBox>
            <PostCardBox className="title" phototitle="true">
                {props.title}
            </PostCardBox>
            <PostCardBox
                className="content"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(props.body),
                }}
            />
            <PostCardBox className="nav">
                <div className="wrapper">
                    {props.type === '좋아요' && location.includes('mypage') ? (
                        heart ? (
                            <div className="likeheart" onClick={heartControl} />
                        ) : (
                            <div className="heart" onClick={heartControl} />
                        )
                    ) : (
                        <div className="heart" />
                    )}
                    <div>{heart ? props.likeCount : props.likeCount - 1}</div>
                </div>
                <div className="wrapper">
                    <div className="comment" />
                    <div>{props.commentCount}</div>
                </div>
            </PostCardBox>
        </PostCardBoxWrapper>
    );
};

export default PostCardWithPhoto;
