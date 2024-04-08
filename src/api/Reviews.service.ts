import {LinkPathFormater} from "@/components/utils/LinkPathFormater";
import {IProductReview} from "@/components/interfaces/Product.interface";
import {axiosClassic} from "@/api/api";

const reviewURL = "http://localhost:8080/products/{productId}/reviews";

export const ReviewService = {
    async getAllReviews(productId: number) {
        return axiosClassic.get<IProductReview[]>(LinkPathFormater(reviewURL, productId));
    },
    async getReviewById(productId: number, reviewId: number) {
        return axiosClassic.get<IProductReview>(LinkPathFormater(reviewURL, productId) + "/" + reviewId);
    },
    async createReview(productId: number, review: IProductReview) {
        return axiosClassic.post(LinkPathFormater(reviewURL, productId), review);
    },
    async updateReview(productId: number, review: IProductReview, reviewId: number) {
        return axiosClassic.put(LinkPathFormater(reviewURL, productId) + "/" + reviewId, review);
    },
    async deleteReview(productId: number, reviewId: number) {
        return axiosClassic.delete(LinkPathFormater(reviewURL, productId) + "/" + reviewId);
    }
}