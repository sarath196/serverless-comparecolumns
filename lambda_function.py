from itertools import zip_longest
import json


def lambda_handler(event, context):
    
    field1 = event['field1'].splitlines()
    field2 = event['field2'].splitlines()

    field1 = list(filter(None, field1))
    field2 = list(filter(None, field2))
    
    try:
        data = set_difference_calc(field1, field2)
        status = 200
    except Exception as e:
        data = e
        status = 400
        print(e)

    return {
        'statusCode': status,
        'body': json.dumps(data)
    }
    

def listOflist(l1, l2, l3): 
    return [list(i) for i in zip_longest(l1, l2, l3)]


def set_difference_calc(field1, field2):
    
    list_index = field1 + field2
    union_result = sorted((set(field1) | set(field2)), key=list_index.index)
    intersection_result = sorted((set(field1) & set(field2)), key=list_index.index)
    differnce_A_B_result = sorted((set(field1) - set(field2)), key=list_index.index)
    difference_B_A_result = sorted((set(field2) - set(field1)), key=list_index.index)
    Symmetric_difference_result = sorted((set(field1) ^ set(field2)), key=list_index.index)
    
    context = {
        'union_result': listOflist(field1,field2,union_result),
        'union_result_set': union_result,
        'intersection_result': listOflist(field1,field2,intersection_result),
        'intersection_result_set': intersection_result,
        'differnce_A_B_result': listOflist(field1,field2,differnce_A_B_result),
        'differnce_A_B_result_set': differnce_A_B_result,
        'difference_B_A_result': listOflist(field1,field2,difference_B_A_result),
        'difference_B_A_result_set': difference_B_A_result,
        'Symmetric_difference_result': listOflist(field1,field2,Symmetric_difference_result),
        'Symmetric_difference_result_set': Symmetric_difference_result
    }
    return context
