from rest_framework.pagination import LimitOffsetPagination

class GithubRepoLimitOffsetPagination(LimitOffsetPagination):
    # por defecto devuelve 10, el cliente puede usar ?limit=
    default_limit = 10
    limit_query_param = 'limit'
    offset_query_param = 'offset'
    max_limit = 100
