import Apolloclient, {gql} from 'apollo-boost'

export const client = new Apolloclient({uri:'http://ec2-54-180-98-167.ap-northeast-2.compute.amazonaws.com:8080/'})